#!/usr/bin/env python3
"""
Stick Content Audit Script
Checks all MDX content files against the Part 8 quality checklist.
Usage: python3 audit.py <content_dir_or_file> [--json]
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime

# ─── Kill List & Corporate Speak ─────────────────────────────────────────────

KILL_LIST = [
    r'\bdelve\b', r'\bdelves\b', r'\bdelving\b',
    r"it's important to note",
    r"in today's",
    r'\blandscape\b',  # as metaphor — will check context
    r'\bleverage\b', r'\bleveraging\b', r'\bleveraged\b',
    r'\bseamless\b', r'\bseamlessly\b',
    r'\btransformative\b',
    r'\bunlock\b(?=\s+(?:potential|value|power|growth|opportunity))',
    r'\bcutting-edge\b', r'\bcutting edge\b',
    r'\brobust\b',
    r'\bmultifaceted\b',
    r'\brevolutionize\b', r'\brevolutionizing\b', r'\brevolutionized\b',
    r"it's worth noting",
    r'\btestament to\b',
    r'\bpivotal\b',
    r'\bgame-changer\b', r'\bgame changer\b',
    r'\bembark\b', r'\bembarking\b',
    r'\bmoreover\b',
    r'\bfurthermore\b',
    r'\bin terms of\b',
    r'\barguably\b',
]

# "landscape" needs context check — skip if it's about actual golf landscape
LANDSCAPE_EXCEPTIONS = ['golf course', 'terrain', 'mountain', 'scenery', 'view']

CHEESY_PHRASES = [
    r'gets? the blood pumping',
    r'where things get interesting',
    r"that's when the real fun begins",
    r'things can get wild',
    r'the drama unfolds',
    r"it's a whole different ballgame",
    r'the stakes are high',
    r"you won't want to miss",
    r'at the end of the day',
    r'it all comes down to',
    r"here's where it gets good",
    r'\bbuckle up\b',
]

CORPORATE_SPEAK = [
    r'\butilize\b', r'\butilizing\b', r'\butilized\b',
    r'\bfunctionality\b',
    r'\bsolution\b(?!.*\b(?:math|equation|solve)\b)',  # skip math context
    r'\bsynergy\b', r'\bsynergies\b',
    r'\bstakeholder\b',
    r'\bdeliverable\b', r'\bdeliverables\b',
    r'\bactionable\b',
    r'\bstreamline\b', r'\bstreamlined\b', r'\bstreamlining\b',
    r'\becosystem\b',
    r'\bparadigm\b',
    r'\bcircle back\b',
    r'\bdeep dive\b',
    r'\bunpack\b(?=.*(?:concept|idea|topic|meaning))',
]

# ─── Parsing ─────────────────────────────────────────────────────────────────

def parse_mdx(filepath):
    """Parse an MDX file into frontmatter dict and body text."""
    content = Path(filepath).read_text(encoding='utf-8')

    # Split frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter_raw = parts[1]
            body = parts[2]
        else:
            frontmatter_raw = ''
            body = content
    else:
        frontmatter_raw = ''
        body = content

    # Simple YAML-ish parsing (good enough for our frontmatter)
    fm = {}
    fm['_raw'] = frontmatter_raw

    # Title
    m = re.search(r'^title:\s*"(.+?)"', frontmatter_raw, re.MULTILINE)
    if m:
        fm['title'] = m.group(1)

    # Description
    m = re.search(r'^description:\s*"(.+?)"', frontmatter_raw, re.MULTILINE)
    if m:
        fm['description'] = m.group(1)

    # Dates
    m = re.search(r'^publishedAt:\s*"(.+?)"', frontmatter_raw, re.MULTILINE)
    if m:
        fm['publishedAt'] = m.group(1)
    m = re.search(r'^updatedAt:\s*"(.+?)"', frontmatter_raw, re.MULTILINE)
    if m:
        fm['updatedAt'] = m.group(1)

    # Keywords
    keywords = re.findall(r'^\s+-\s+(.+)$',
                          re.search(r'^keywords:\s*\n((?:\s+-\s+.+\n?)+)', frontmatter_raw, re.MULTILINE).group(1),
                          re.MULTILINE) if re.search(r'^keywords:', frontmatter_raw, re.MULTILINE) else []
    fm['keywords'] = [k.strip().strip('"') for k in keywords]

    # FAQ
    faq_entries = []
    faq_block = re.search(r'^faq:\s*\n((?:\s+-\s+.+\n?|\s+.+\n?)+)', frontmatter_raw, re.MULTILINE)
    if faq_block:
        questions = re.findall(r'question:\s*"(.+?)"', faq_block.group(1))
        answers = re.findall(r'answer:\s*"(.+?)"', faq_block.group(1))
        for q, a in zip(questions, answers):
            faq_entries.append({'question': q, 'answer': a})
    fm['faq'] = faq_entries

    # Game name (for game guides)
    m = re.search(r'^gameName:\s*"(.+?)"', frontmatter_raw, re.MULTILINE)
    if m:
        fm['gameName'] = m.group(1)

    return fm, body


def word_count(text):
    """Count words in text, stripping markdown."""
    clean = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)  # links
    clean = re.sub(r'[*_`#]', '', clean)  # formatting
    clean = re.sub(r'```[\s\S]*?```', '', clean)  # code blocks
    words = clean.split()
    return len(words)


# ─── Checks ──────────────────────────────────────────────────────────────────

def check_kill_list(body, filepath):
    """Check for kill list violations."""
    issues = []
    body_lower = body.lower()

    for pattern in KILL_LIST:
        matches = list(re.finditer(pattern, body_lower, re.IGNORECASE))
        for match in matches:
            # Context check for "landscape"
            if 'landscape' in pattern:
                context_start = max(0, match.start() - 50)
                context_end = min(len(body_lower), match.end() + 50)
                context = body_lower[context_start:context_end]
                if any(exc in context for exc in LANDSCAPE_EXCEPTIONS):
                    continue

            # Get line number
            line_num = body[:match.start()].count('\n') + 1
            # Get surrounding context
            ctx_start = max(0, match.start() - 30)
            ctx_end = min(len(body), match.end() + 30)
            context = body[ctx_start:ctx_end].replace('\n', ' ').strip()

            issues.append({
                'type': 'critical',
                'category': 'Kill List',
                'message': f'Kill list word: "{match.group()}"',
                'context': f'...{context}...',
                'line': line_num
            })

    return issues


def check_cheesy_phrases(body):
    """Check for cheesy phrases."""
    issues = []
    for pattern in CHEESY_PHRASES:
        matches = list(re.finditer(pattern, body, re.IGNORECASE))
        for match in matches:
            line_num = body[:match.start()].count('\n') + 1
            issues.append({
                'type': 'critical',
                'category': 'Cheesy Phrase',
                'message': f'Cheesy phrase: "{match.group()}"',
                'line': line_num
            })
    return issues


def check_corporate_speak(body):
    """Check for corporate speak."""
    issues = []
    for pattern in CORPORATE_SPEAK:
        matches = list(re.finditer(pattern, body, re.IGNORECASE))
        for match in matches:
            line_num = body[:match.start()].count('\n') + 1
            issues.append({
                'type': 'critical',
                'category': 'Corporate Speak',
                'message': f'Corporate speak: "{match.group()}"',
                'line': line_num
            })
    return issues


def check_meta_description(fm):
    """Check meta description length."""
    issues = []
    desc = fm.get('description', '')
    if not desc:
        issues.append({'type': 'critical', 'category': 'Technical', 'message': 'Missing meta description'})
    elif len(desc) > 160:
        issues.append({'type': 'critical', 'category': 'Technical',
                       'message': f'Meta description too long: {len(desc)} chars (max 160)',
                       'context': desc})
    elif len(desc) < 130:
        issues.append({'type': 'warning', 'category': 'Technical',
                       'message': f'Meta description short: {len(desc)} chars (target 130-160)',
                       'context': desc})
    return issues


def check_title_length(fm):
    """Check title tag length."""
    issues = []
    title = fm.get('title', '')
    # Full title with suffix
    full_title = f"{title} | Stick Golf"
    if len(full_title) > 60:
        issues.append({'type': 'warning', 'category': 'Technical',
                       'message': f'Title tag may be long: "{full_title}" ({len(full_title)} chars, target <60)'})
    return issues


def check_internal_links(body):
    """Check internal link count."""
    issues = []
    # Match markdown links to internal pages
    internal_links = re.findall(r'\[([^\]]+)\]\((/[^)]+)\)', body)
    count = len(internal_links)

    if count == 0:
        issues.append({'type': 'critical', 'category': 'Content',
                       'message': 'Zero internal links (minimum 3 required)'})
    elif count < 3:
        issues.append({'type': 'warning', 'category': 'Content',
                       'message': f'Only {count} internal link(s) (minimum 3 recommended)',
                       'context': ', '.join([f'{text} → {url}' for text, url in internal_links])})

    return issues, internal_links


def check_outbound_links(body):
    """Check for at least 1 outbound link."""
    issues = []
    outbound = re.findall(r'\[([^\]]+)\]\((https?://[^)]+)\)', body)
    # Filter out stickapp.golf links
    outbound = [(text, url) for text, url in outbound if 'stickapp.golf' not in url]

    if len(outbound) == 0:
        issues.append({'type': 'warning', 'category': 'Content',
                       'message': 'No outbound links to trusted external sources (at least 1 recommended)'})

    return issues


def check_faq(fm, content_type):
    """Check FAQ section quality."""
    issues = []
    faqs = fm.get('faq', [])

    if content_type == 'game' and len(faqs) == 0:
        issues.append({'type': 'critical', 'category': 'Content', 'message': 'No FAQ section (5-8 required for game guides)'})
    elif content_type == 'game' and len(faqs) < 5:
        issues.append({'type': 'warning', 'category': 'Content', 'message': f'Only {len(faqs)} FAQ questions (5-8 recommended)'})
    elif len(faqs) > 8:
        issues.append({'type': 'warning', 'category': 'Content', 'message': f'{len(faqs)} FAQ questions (5-8 recommended, {len(faqs)} may be too many)'})

    for faq in faqs:
        answer_words = word_count(faq['answer'])
        if answer_words < 35:
            issues.append({'type': 'warning', 'category': 'Content',
                           'message': f'FAQ answer too short ({answer_words} words, target 40-60): "{faq["question"][:50]}..."'})
        elif answer_words > 70:
            issues.append({'type': 'warning', 'category': 'Content',
                           'message': f'FAQ answer long ({answer_words} words, target 40-60): "{faq["question"][:50]}..."'})

    return issues


def check_cta(body):
    """Check for CTA mentions of Stick/the app."""
    issues = []
    # Look for mentions of Stick as product + action words
    cta_patterns = [
        r'(?i)\bstick\b.*(?:track|download|try|app store|get started)',
        r'(?i)(?:track|download|try|get started).*\bstick\b',
        r'(?i)app store',
        r'(?i)download.*app',
    ]
    cta_count = 0
    for pattern in cta_patterns:
        if re.search(pattern, body):
            cta_count += 1

    if cta_count == 0:
        issues.append({'type': 'warning', 'category': 'Content',
                       'message': 'No CTA mentioning Stick or the app (at least 1 recommended)'})

    return issues


def check_first_person(body):
    """Check for first-person voice."""
    issues = []
    # Check first 500 words
    first_section = ' '.join(body.split()[:500])
    we_count = len(re.findall(r'\b(?:we|our|we\'ve|we\'re)\b', first_section, re.IGNORECASE))

    if we_count == 0:
        issues.append({'type': 'warning', 'category': 'Voice',
                       'message': 'No first-person voice (we/our) in first 500 words'})

    return issues


def check_named_players(body):
    """Check for named players in examples."""
    issues = []
    players = ['Justin', 'Jason', 'Evan', 'Todd']
    found = [p for p in players if p in body]

    if len(found) == 0:
        issues.append({'type': 'warning', 'category': 'Voice',
                       'message': 'No named players (Justin, Jason, Evan, Todd) in examples'})

    return issues


def check_exclamation_points(body):
    """Check exclamation point count."""
    issues = []
    # Exclude code blocks and frontmatter
    clean = re.sub(r'```[\s\S]*?```', '', body)
    count = clean.count('!')

    if count > 1:
        issues.append({'type': 'warning', 'category': 'Voice',
                       'message': f'{count} exclamation points (maximum 1 per piece)'})

    return issues


def check_dates(fm):
    """Check for required dates."""
    issues = []
    if not fm.get('publishedAt'):
        issues.append({'type': 'warning', 'category': 'Technical', 'message': 'Missing publishedAt date'})
    if not fm.get('updatedAt'):
        issues.append({'type': 'warning', 'category': 'Technical', 'message': 'Missing updatedAt date'})
    return issues


def check_keywords(fm):
    """Check for keywords array."""
    issues = []
    if not fm.get('keywords'):
        issues.append({'type': 'warning', 'category': 'Technical', 'message': 'Missing keywords array in frontmatter'})
    return issues


def check_keyword_in_first_100(fm, body):
    """Check if primary keyword appears in first 100 words."""
    issues = []
    keywords = fm.get('keywords', [])
    if not keywords:
        return issues

    primary = keywords[0].lower()
    first_100 = ' '.join(body.split()[:100]).lower()

    if primary not in first_100:
        issues.append({'type': 'warning', 'category': 'Content',
                       'message': f'Primary keyword "{keywords[0]}" not found in first 100 words'})

    return issues


def check_opening_length(body):
    """Check that opening paragraph is concise (under ~60 words)."""
    issues = []
    # Get first paragraph (text before first heading or blank line after content starts)
    lines = body.strip().split('\n')
    first_para = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('#'):
            break
        if stripped.startswith('```'):
            break
        if stripped == '' and first_para:
            break
        if stripped:
            first_para.append(stripped)

    if first_para:
        para_text = ' '.join(first_para)
        wc = word_count(para_text)
        if wc > 75:
            issues.append({'type': 'warning', 'category': 'Content',
                           'message': f'Opening paragraph is {wc} words (target ~60 for AI extraction)'})

    return issues


# ─── Main Audit ──────────────────────────────────────────────────────────────

def audit_file(filepath):
    """Run all checks on a single MDX file."""
    filepath = Path(filepath)
    fm, body = parse_mdx(filepath)

    # Determine content type
    path_str = str(filepath)
    if '/games/' in path_str:
        content_type = 'game'
    elif '/blog/' in path_str:
        content_type = 'blog'
    elif '/guides/' in path_str:
        content_type = 'guide'
    else:
        content_type = 'unknown'

    all_issues = []

    # Run all checks
    all_issues.extend(check_kill_list(body, filepath))
    all_issues.extend(check_cheesy_phrases(body))
    all_issues.extend(check_corporate_speak(body))
    all_issues.extend(check_meta_description(fm))
    all_issues.extend(check_title_length(fm))

    link_issues, internal_links = check_internal_links(body)
    all_issues.extend(link_issues)

    all_issues.extend(check_outbound_links(body))
    all_issues.extend(check_faq(fm, content_type))
    all_issues.extend(check_cta(body))
    all_issues.extend(check_first_person(body))
    all_issues.extend(check_named_players(body))
    all_issues.extend(check_exclamation_points(body))
    all_issues.extend(check_dates(fm))
    all_issues.extend(check_keywords(fm))
    all_issues.extend(check_keyword_in_first_100(fm, body))
    all_issues.extend(check_opening_length(body))

    return {
        'file': filepath.name,
        'path': str(filepath),
        'type': content_type,
        'title': fm.get('title', '(no title)'),
        'description_len': len(fm.get('description', '')),
        'faq_count': len(fm.get('faq', [])),
        'internal_link_count': len(internal_links),
        'word_count': word_count(body),
        'issues': all_issues,
        'critical_count': len([i for i in all_issues if i['type'] == 'critical']),
        'warning_count': len([i for i in all_issues if i['type'] == 'warning']),
    }


def audit_directory(content_dir):
    """Audit all MDX files in a content directory tree."""
    content_path = Path(content_dir)
    results = []

    for mdx_file in sorted(content_path.rglob('*.mdx')):
        try:
            result = audit_file(mdx_file)
            results.append(result)
        except Exception as e:
            results.append({
                'file': mdx_file.name,
                'path': str(mdx_file),
                'error': str(e),
                'issues': [],
                'critical_count': 0,
                'warning_count': 0,
            })

    return results


def print_report(results):
    """Print a human-readable audit report."""
    total_critical = sum(r['critical_count'] for r in results)
    total_warnings = sum(r['warning_count'] for r in results)
    total_issues = total_critical + total_warnings
    pages_with_issues = len([r for r in results if r['issues']])
    clean_pages = [r for r in results if not r['issues']]

    print(f"\n## Content Audit Results — {datetime.now().strftime('%Y-%m-%d')}")
    print(f"\n### Pages Audited: {len(results)}")
    print(f"### Issues Found: {total_issues} ({total_critical} critical, {total_warnings} warnings) across {pages_with_issues} pages")

    # Critical issues first
    critical_results = [r for r in results if r['critical_count'] > 0]
    if critical_results:
        print(f"\n**Critical (fix before publish):**\n")
        for r in critical_results:
            for issue in r['issues']:
                if issue['type'] == 'critical':
                    ctx = f" — {issue.get('context', '')}" if issue.get('context') else ''
                    line = f" (line {issue['line']})" if issue.get('line') else ''
                    print(f"- **{r['file']}**: {issue['message']}{line}{ctx}")

    # Warnings
    warning_results = [r for r in results if r['warning_count'] > 0]
    if warning_results:
        print(f"\n**Warnings (should fix):**\n")
        for r in warning_results:
            for issue in r['issues']:
                if issue['type'] == 'warning':
                    ctx = f" — {issue.get('context', '')}" if issue.get('context') else ''
                    print(f"- **{r['file']}**: {issue['message']}{ctx}")

    # Clean pages
    if clean_pages:
        print(f"\n**Clean Pages:**\n")
        for r in clean_pages:
            print(f"- {r['file']}")

    # Summary table
    print(f"\n### Page Summary\n")
    print(f"| Page | Type | Words | Links | FAQs | Critical | Warnings |")
    print(f"|------|------|-------|-------|------|----------|----------|")
    for r in results:
        print(f"| {r['file']} | {r.get('type', '?')} | {r.get('word_count', '?')} | {r.get('internal_link_count', '?')} | {r.get('faq_count', '?')} | {r['critical_count']} | {r['warning_count']} |")


def print_json(results):
    """Print results as JSON."""
    print(json.dumps(results, indent=2))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 audit.py <content_dir_or_file> [--json]")
        sys.exit(1)

    target = sys.argv[1]
    json_output = '--json' in sys.argv

    if os.path.isfile(target):
        results = [audit_file(target)]
    elif os.path.isdir(target):
        results = audit_directory(target)
    else:
        print(f"Error: {target} not found")
        sys.exit(1)

    if json_output:
        print_json(results)
    else:
        print_report(results)
