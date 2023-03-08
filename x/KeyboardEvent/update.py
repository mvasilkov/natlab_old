from collections import defaultdict
from pathlib import Path
import re

_path = Path(__file__).parent.resolve()


def tag_fn(a, tags):
    if tags:
        return f"  /* {' '.join(tags)} */ '{a}',"

    return f"  '{a}',"


def update_tags():
    list_start = 'export const keyboardEventCodes = ['
    list_end = ']'

    js_lines = (_path / 'keyboardEventCodes.js').read_text('utf-8').splitlines()

    list_start_index = js_lines.index(list_start)
    list_end_index = js_lines.index(list_end)

    codes_lines = js_lines[list_start_index + 1 : list_end_index]

    codes = [re.sub(r"  (?:/\*.*?\*/ )?'(.*?)',", r'\1', a) for a in codes_lines]

    codes_tags = defaultdict(list)

    for a in _path.glob('*.txt'):
        tag = a.name.replace('.txt', '')

        print(tag)

        lines = a.read_text('utf-8').splitlines()

        for code in lines:
            assert code in codes

            codes_tags[code].append(tag)

    js_lines[list_start_index + 1 : list_end_index] = [tag_fn(a, codes_tags[a]) for a in codes]

    js_lines.append('')

    text = '\n'.join(js_lines)

    (_path / 'keyboardEventCodes.js').write_text(text, 'utf-8', newline='\n')


if __name__ == '__main__':
    update_tags()
