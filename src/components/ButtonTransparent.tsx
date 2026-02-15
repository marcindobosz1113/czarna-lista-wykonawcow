interface ButtonTransparentProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
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
  children,
}: ButtonTransparentProps) => {
  return (
    <button onClick={onClick} style={styles}>
      {children}
    </button>
  )
}
