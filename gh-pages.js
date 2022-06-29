var ghpages = import('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/wbhouston/wbhouston.github.io.git',
        user: {
            name: 'William Houston',
            email: 'wmbhouston@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
