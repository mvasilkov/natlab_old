#!/usr/bin/env python3

from functools import cache
from pathlib import Path

from django.template import Context, Engine

OUR_ROOT = Path(__file__).parents[1].resolve()
TEMPLATES_DIR = OUR_ROOT / 'build' / 'templates'


@cache
def get_engine():
    return Engine(dirs=[TEMPLATES_DIR.as_posix()])


def render_to_string(template_string: str, context_dict: dict) -> str:
    template = get_engine().from_string(template_string)
    return template.render(Context(context_dict))


def lab_templates():
    skip_folders = {
        '.git',
        'build',
        'node_modules',
        'shared',
        'test',
        'virtual',
    }

    for path in OUR_ROOT.iterdir():
        if path.name not in skip_folders and path.is_dir():
            index_template = path / '_index.html'
            if not index_template.is_file():
                continue

            print('*', path.name)

            page = render_to_string(index_template.read_text(encoding='utf-8'), {})
            with open(path / 'index.html', 'w', encoding='utf-8', newline='\n') as out:
                out.write(page)


if __name__ == '__main__':
    print('natlab: templates')
    lab_templates()
