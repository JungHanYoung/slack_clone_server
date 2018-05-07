export interface ResolverMap {
    [key: string]: {
        [key: string]: (
            parent: any, 
            args: any, 
            context: {
                SECRET: string,
                SECRET2: string
            }, 
            info: any) => any;
    };
}