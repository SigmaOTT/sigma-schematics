
# active hook
pnpm husky install

# add commit-lint hook
pnpm husky add .husky/commit-msg 'npm commitlint --edit $1'


# install husky hook for lint-staged
pnpm husky add .husky/pre-commit 'npm lint-staged'


