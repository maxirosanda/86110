export const createUserDto = ({firstName,lastName,email,password,age,role}) =>{

    if(firstName == "") throw new Error("first_name required")
    if(lastName == "") throw new Error("last_name required")
    if(email == "") throw new Error("email required")
    if(password == "") throw new Error("password required")
    if(age == "") throw new Error("age required")

    const fullName = (firstName == "" || lastName == "") ? "no name" : `${firstName} ${lastName}`

    return {
        firstName,
        lastName,
        fullName,
        email,
        password,
        age,
        role: role ? role : "user"
    }
}
