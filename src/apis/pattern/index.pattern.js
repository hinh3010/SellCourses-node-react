const emailPattern = () => new RegExp('gmail.com')
const phonePattern = () => new RegExp("/^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/")
const passwordPattern = () => new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

const patterm = {
    email: emailPattern,
    phone: phonePattern,
    password: passwordPattern
}

export default patterm