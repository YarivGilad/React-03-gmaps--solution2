export function getLogger(prefix){
    return function(...args){
        console.log.apply(null, [prefix, ...args]);
    }
}

// export const getLogger = (prefix)=> (...args) => console.log.apply(null, [prefix, ...args]);