export function getLogger(prefix){
    return function(...args){
        console.log(prefix, ...args);
    }
}

// export const getLogger = (prefix)=> (...args) => console.log(prefix, ...args);