function removeDuplicates(arr: Array<string>): Array<string> {
    let a: Array<string> = [];
    arr.forEach((elm: string) => {
        if (!a.includes(elm)) a.push(elm);
    });

    return a;
}

export default removeDuplicates;
