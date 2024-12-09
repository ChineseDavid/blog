'use server';
import { db } from '@/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(2, '用户名至少包含2个字符').max(20, '用户名应少于20个字符'),
  userId: z.string().min(3, '用户ID至少包含3个字符').max(20, '用户ID应少于20个字符'),
  password: z.string().min(8, '密码至少包含8个字符').max(20, '密码应少于30个字符').refine((password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber;
  }, '密码至少包含大写字母、小写字母和数字'),
})

export const validatedRegisterFields = async (formData: FormData) => {
  const username = formData.get('createUsername');
  const userId = formData.get('createUserId');
  const password = formData.get('createPassword');
  const validatedFields = schema.safeParse({
    username,
    userId,
    password,
  })
  // Return early if the form data is invalid  
  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message,
    }
  }
  return {
    success: true,
  }
}

interface Payload {
  userId: string;
  username: string;
}

async function generateJwtToken(payload: Payload, secretKey: string, expiresIn: number): Promise<string> {
  // return jwt.sign(payload, secretKey, { expiresIn });
  const key = new TextEncoder().encode(secretKey);
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresIn; // 设置过期时间为1小时后，单位是秒
  const jwt = await new SignJWT({ ...payload } as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(key);
  return jwt;
}


export const getToken = (info: Payload) => {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("No secret key found");
  }
  return generateJwtToken(info, secret, 60 * 60 * 24 * 30);
}

export const verifyToken = async (token: string) => {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("No secret key found");
  }
  const secretKey = new TextEncoder().encode(secret);
  return await jwtVerify(token, secretKey);
}

export const login = async (prevState: { message: string }, formData: FormData) => {
  const data = { ...prevState };
  const userId = formData.get('userId');
  const password = formData.get('password');

  const user = await db.user.findFirst({
    where: {
      userId: String(userId),
      password: String(password)
    }
  });
  if (!user) {
    data.message = '账号或密码错误';
    return data;
  }
  const token = await getToken({
    userId: user.userId,
    username: user.username,
  });
  const r = await db.user.update({
    where: {
      userId: user.userId,
    },
    data: {
      token
    }
  });
  if (r && r.token) {
    // 获取cookies对象
    const cookieStore = cookies();

    // 设置cookie，将token保存进去
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 一个月有效期
      path: '/',
    });
    redirect('/');
  } else {
    data.message = '登录失败';
    return data;
  }
}

// 检查指定userId是否已存在于数据库中
const isUserIdExists = async (userId: string): Promise<boolean> => {
  const existingUser = await db.user.findUnique({
    where: {
      userId: userId,
    },
  });
  return !!existingUser;
};

export const register = async (formData: FormData) => {
  const username = formData.get('createUsername')?.toString();
  const userId = formData.get('createUserId')?.toString();
  const password = formData.get('createPassword')?.toString();

  const valid = await validatedRegisterFields(formData);

  if (!username || !userId || !password) {
    return {
      success: false,
      message: '请填写完整信息'
    }
  }

  if (!valid.success) {
    return valid;
  }

  const token = await getToken({
    userId,
    username,
  });

  const isExists = await isUserIdExists(userId);

  if (isExists) {
    return {
      success: false,
      message: '用户ID已存在'
    }
  }

  await db.user.create({
    data: {
      username,
      userId,
      password,
      token,
    }
  });
  // 获取cookies对象
  const cookieStore = cookies();

  // 设置cookie，将token保存进去
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 一个月有效期
    path: '/',
  });
  redirect('/');

}

export const logout = async () => {
  // 获取cookies对象
  const cookieStore = cookies();

  // 设置cookie，将token保存进去
  cookieStore.set('auth_token', '', {
    maxAge: 0,
    httpOnly: true,
    path: '/'
  })
  redirect('/');
}