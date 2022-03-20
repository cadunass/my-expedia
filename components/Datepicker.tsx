type Props = {
  name?: string;
  value?: string | string[];
};

const Datepicker = ({ name, value }: Props) => {
  return (
    <div className='w-min p-4 mr-2 border border-solid border-gray-400 rounded-lg'>
      <input name={name} type='date' defaultValue={value} />
    </div>
  );
};

export default Datepicker;
