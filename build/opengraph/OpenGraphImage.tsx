export type OpenGraphImageProps = {
  title: string;
  backgroundImage: string;
};

export function OpenGraphImage({ title, backgroundImage }: OpenGraphImageProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: '1200px',
        height: '630px',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '28px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          color: '#fff',
          fontSize: '64px',
          fontWeight: 600,
          lineHeight: '1.2',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        {title}
      </div>
      <div style={{ color: '#fff', fontSize: '32px', lineHeight: '1.2' }}>Nate Kohari</div>
    </div>
  );
}
