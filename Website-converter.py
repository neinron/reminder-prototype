from bs4 import BeautifulSoup
import sys

def html_table_to_markdown(table):
    rows = table.find_all('tr')
    md = []
    for i, row in enumerate(rows):
        cols = [col.get_text(strip=True).replace('\n', ' ') for col in row.find_all(['td', 'th'])]
        md.append('| ' + ' | '.join(cols) + ' |')
        if i == 0:  # header
            md.append('|' + '---|' * len(cols))
    return '\n'.join(md)

def html_to_markdown(input_path, output_path):
    with open(input_path, encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Convert all tables
    tables = soup.find_all('table')
    md_tables = [html_table_to_markdown(table) for table in tables]

    # Optional: Add other HTML elements to Markdown (e.g. h1, h2, p)
    md_text = []
    for tag in soup.find_all(['h1', 'h2', 'h3', 'p']):
        if tag.name.startswith('h'):
            level = int(tag.name[1])
            md_text.append('#' * level + ' ' + tag.get_text(strip=True))
        elif tag.name == 'p':
            md_text.append(tag.get_text(strip=True))
    # Add tables after text
    md_text.extend(md_tables)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(md_text))

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python html_to_markdown.py input.html output.md')
    else:
        html_to_markdown(sys.argv[1], sys.argv[2])