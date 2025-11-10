#!/bin/bash -xeu

latest="$(gh release list --repo scala/scala3 --exclude-pre-releases --exclude-drafts --json isLatest,tagName --jq '.[] | select(.isLatest) | .tagName')"
[[ -n "$latest" ]]

# wget https://repo1.maven.org/maven2/org/scala-lang/scala3-library_3/$latest/scala3-library_3-$latest-javadoc.jar -O scala.jar

# unzip scala.jar -d dist/api/3.x

# cd dist
# wget https://www.scala-lang.org/api/3.x/ --recursive --no-parent -nv

wget https://github.com/scala/scala3/archive/refs/tags/$latest.zip -O scala.zip
unzip scala.zip -d scala

cd scala


