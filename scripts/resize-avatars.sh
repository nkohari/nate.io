#!/bin/bash

shopt -s nullglob nocaseglob extglob

for FILE in *.@(webp); do
  magick "$FILE" -resize 1024x1024 "$FILE"
done
