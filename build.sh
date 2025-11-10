#!/bin/bash -xeu

latest="$(gh release list --repo scala/scala3 --exclude-pre-releases --exclude-drafts --json isLatest,tagName --jq '.[] | select(.isLatest) | .tagName')"

[[ -n "$latest" ]]

wget https://repo1.maven.org/maven2/org/scala-lang/scala3-library_3/$latest/scala3-library_3-$latest-javadoc.jar -O scala.jar

rm -rf api
mkdir -p api/3.x
unzip scala.jar -d api/3.x


