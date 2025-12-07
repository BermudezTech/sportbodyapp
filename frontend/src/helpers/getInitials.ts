function getInitials(name: string) {
    if (name === "") return "XX";
    let splited = name.split(" ");
    return splited[0][0];
}

export { getInitials };
