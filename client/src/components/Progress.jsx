export default function Progress({ value, big }) {
  return <div className={'bar' + (big ? ' big' : '')} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
    <i style={{ width: value + '%' }} /></div>;
}
