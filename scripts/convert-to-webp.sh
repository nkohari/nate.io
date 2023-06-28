#!/bin/bash

shopt -s nullglob nocaseglob extglob

for FILE in *.@(jpg|jpeg|tif|tiff|png); do
  cwebp "$FILE" -o "${FILE%.*}".webp
  rm "$FILE"
done
