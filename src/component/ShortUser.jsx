export const ShortUser = (firstName, lastName) => {
    return `${(firstName && firstName?.length > 1) ? ((((firstName[0].toUpperCase() === "S" || firstName[0].toUpperCase() === "C") && firstName[1].toUpperCase() === "H")) ? firstName?.substring(0, 2) + ". " : firstName?.substring(0, 1) + ". ") : ""}${lastName}`
}
