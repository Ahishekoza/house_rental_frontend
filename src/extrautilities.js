export  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    const maskedUser = user[0] + "*".repeat(user.length - 2) + user[user.length - 1];
    return `${maskedUser}@${domain}`;
  };
  