{
  "targets": [
    {
      "target_name": "nativeMulberry32",
      "sources": [
        "nativeMulberry32.cxx"
      ],
      "include_dirs": [
        "<!(node -e 'require(`nan`)')"
      ]
    }
  ]
}
