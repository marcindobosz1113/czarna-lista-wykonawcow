interface ButtonTransparentProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  children: React.ReactNode
}

const styles = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
}

export const ButtonTransparent = ({
  onClick,
  className,
  children,
}: ButtonTransparentProps) => {
  return (
    <button onClick={onClick} style={styles} className={className}>
      {children}
    </button>
  )
}
