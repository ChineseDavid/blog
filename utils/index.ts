export const suspense = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

export const handleError = (err: unknown) => {
  if (err instanceof Error) {
    return {
      errors: {
        _form: [err.message],
      },
    };
  } else {
    return {
      errors: {
        _form: ['系统错误'],
      },
    };
  }
};

export const handleMessageError = (err: unknown) => {
  if (err instanceof Error) {
    return {
      success: false,
      message: err.message,
      data: [],
    };
  } else {
    return {
      success: false,
      message: "系统错误",
      data: [],
    };
  }
};

export const formatDate = (time: number | string | Date) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};