
interface IconProps {
  name: string;
  size?: string;
  className?: string;
  onClick?: () => void;
}


const Icon = ({ name, size = 'lg', className, onClick }: IconProps) => {
  return <span className={`iconfont icon-${name} text-${size} ${className}`} onClick={onClick}></span>;
}
export default Icon;