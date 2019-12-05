interface ConfigProps {
    servername: 'rongcloudy' | 'anyother',
    appKey: string,
    secret: string,
    HashSeed: string
}

const config: ConfigProps = {
    servername: 'rongcloudy',
    appKey: '8luwapkv8jopl',
    secret: '4UEwNmffM2',
    HashSeed: Math.ceil(Math.random() * 100000).toString()
}


export default config;