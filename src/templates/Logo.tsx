type ILogoProps = {
    xl?: boolean;
};
  
const Logo = (props: ILogoProps) => {
    const size = props.xl ? '44' : '32';
    const fontStyle = props.xl
      ? 'font-semibold text-3xl'
      : 'font-semibold text-xl';
  
    return (
      <span className={`inline-flex items-center text-gray-900 ${fontStyle}`}>
        <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    );
};
  
export { Logo };