#!/usr/bin/env python3

import contextlib
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from os.path import split, splitext
from pathlib import Path
import socket

from watchfiles import watch

OUR_ROOT = Path(__file__).parents[1].resolve()


class DualStackServer(ThreadingHTTPServer):
    def server_bind(self):
        with contextlib.suppress(Exception):
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        return super().server_bind()


def _get_best_family(*address):
    addrlist = socket.getaddrinfo(
        *address,
        type=socket.SOCK_STREAM,
        flags=socket.AI_PASSIVE,
    )
    return addrlist[0][0], addrlist[0][4]


def runserver(host='', port=8086):
    DualStackServer.address_family, server_address = _get_best_family(host, port)
    with DualStackServer(server_address[:2], partial(SimpleHTTPRequestHandler, directory=OUR_ROOT)) as server:
        host, port = server.socket.getsockname()[:2]
        url_host = f'[{host}]' if ':' in host else host
        print(f'Listening on http://{url_host}:{port}')
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print('Done')


def find_paths():
    skip_folders = {
        '.git',
        '.vscode',
        'build',
        'node_modules',
        'test',
        'virtual',
    }

    paths = [
        OUR_ROOT / 'node_modules' / 'natlib',
        OUR_ROOT / 'build' / 'templates',
    ]

    for path in OUR_ROOT.iterdir():
        if path.name not in skip_folders and path.is_dir():
            paths.append(path)

    print('Watching folders:', ', '.join(repr(p.name) for p in paths))
    return paths


def watch_files():
    paths = find_paths()

    for changes in watch(*paths):
        run_build = run_tsc = False

        for change in changes:
            filename, extension = splitext(split(change[1])[1])
            if extension == '.ts':
                run_tsc = True
            elif filename.startswith('_') and extension == '.html':
                run_build = True

        print(f'{run_tsc=}, {run_build=}')


def main():
    watch_files()
    runserver()


if __name__ == '__main__':
    main()
