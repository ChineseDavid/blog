import classNames from "classnames";
import { useRouter } from "next/navigation";
import { signOut } from "@/actions";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@heroui/react";


const User = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return <div className="flex relative ml-2 group" >
    {session?.user?.image ? <Image src={session?.user?.image} height={30} width={30} alt="user" className="rounded-full size-8" /> : <CircularProgress size="sm" color="secondary" />}
    <div className="animate-emerge absolute top-8 right-0 hidden group-hover:block py-2">
      <div className={classNames('select-none border p-1 rounded-lg shadow-md bg-bg-normal')}>
        <div className="hover:cursor-pointer w-28 hover:bg-bg-shallow py-1.5 text-sm text-shallow  rounded-lg px-2" onClick={() => {
          router.push('/');
          signOut();
        }}>退出登录</div>
      </div>
    </div>
  </div>
}
export default User;