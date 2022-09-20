#!/usr/bin/env python3

from functools import cache
from pathlib import Path

from django.template import Context, Engine

OUR_ROOT = Path(__file__).parents[1].resolve()
TEMPLATES_DIR = OUR_ROOT / 'templates'


@cache
def get_engine():
    return Engine(dirs=[TEMPLATES_DIR.as_posix()])


def render_to_file(template_string: str, context_dict: dict, out_file: Path):
    template = get_engine().from_string(template_string)
    result = template.render(Context(context_dict))

    with open(out_file, 'w', encoding='utf-8', newline='\n') as out:
        out.write(result)


def natlib_lab_templates():
    skip_folders = {
        '.git',
        'build',
        'node_modules',
        'templates',
        'virtual',
    }

    for path in OUR_ROOT.iterdir():
        if path.name not in skip_folders and path.is_dir():
            index_template = path / '_index.html'
            if not index_template.is_file():
                continue
            print('*', path.name)
            render_to_file(
                index_template.read_text(encoding='utf-8'),
                {},
                path / 'index.html',
            )


if __name__ == '__main__':
    print('natlib-lab: templates')
    natlib_lab_templates()
