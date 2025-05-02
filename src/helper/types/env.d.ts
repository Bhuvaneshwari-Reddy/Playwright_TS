export{}

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            BROWSER:"chrome" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "dev",
            BASEURL:string,
            HEAD:"true" | "false"
        }
    }
}