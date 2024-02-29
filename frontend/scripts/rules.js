const testEmail = (value) => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return emailPattern.test(value)
}

function testPassword(value) {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    return passwordPattern.test(value)

    
}

export {testPassword , testEmail}