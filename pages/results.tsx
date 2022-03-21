import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { popularFilters } from '../utils';
import { Hotel } from '../interfaces';
import Datepicker from '../components/Datepicker';

const Results: NextPage = () => {
  const router = useRouter();
  let { place, checkin, checkout } = router.query;

  const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const getHotels = async () => {
      const response = await fetch('/api/hotels');
      const data = await response.json();

      const hotels = data.filter(
        (hotel: Hotel) =>
          hotel.name?.includes(place as string) &&
          !hotel.booked?.find((dayTaken) => dayTaken == checkin) &&
          !hotel.booked?.find((dayTaken) => dayTaken == checkout)
      );

      setAvailableHotels(hotels);
    };

    getHotels();
  }, [checkin, checkout, place]);

  return (
    <Layout>
      <main>
        <div className='h-full w-full flex flex-col justif p-0 m-0 box-border bg-gray-200 border-t border-solid border-gray-400 px-20'>
          <div className='flex justify-center mt-6'>
            <form
              className='mb-4 flex justify-center'
              onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();

                const target = e.target as typeof e.target & {
                  place: { value: string };
                  checkin: { value: string };
                  checkout: { value: string };
                };

                Router.push({
                  pathname: '/results',
                  query: {
                    place: target.place.value,
                    checkin: target.checkin.value,
                    checkout: target.checkout.value,
                  },
                });
              }}
            >
              <input
                className='w-full border border-solid rounded-lg border-gray-400 p-4 mr-2'
                name='place'
                id='place'
                type='text'
                placeholder='Going to'
                defaultValue={place}
                onChange={(e) => (place = e.target.value)}
              />
              <Datepicker name='checkin' value={checkin} />
              <Datepicker name='checkout' value={checkout} />
              <button
                className='bg-blue-600 rounded-lg p-4 text-white'
                type='submit'
              >
                Search
              </button>
            </form>
          </div>
          <div className='flex flex-row'>
            <div className='flex flex-col w-40 h-full mr-4'>
              <span className='mb-4 font-medium'>Filter by</span>
              <span className='mb-2'>Popular filters</span>
              {popularFilters.map((filter) => (
                <div key={filter.name} className='mb-1'>
                  <input type='checkbox' name={filter.name} />
                  <span className='ml-2'>{filter.title}</span>
                </div>
              ))}
            </div>
            <div className='flex flex-col w-full h-full ml-4'>
              <ol>
                {availableHotels.length ? (
                  availableHotels.map((item) => (
                    <li key={item.id}>
                      <div
                        className='flex flex-row bg-white rounded-lg mb-3 hover:cursor-pointer'
                        onClick={() => alert('TODO')}
                      >
                        <Image
                          src={item.image as string}
                          alt={item.alt as string}
                          width={300}
                          height={160}
                        />
                        <div className='mx-4 my-2 w-full relative'>
                          <div className='flex flex-col'>
                            <h3 className='font-bold'>{item.name}</h3>
                            <span className='text-xs font-light'>
                              {item.location}
                            </span>
                          </div>
                          <span className='flex flex-row justify-end font-medium absolute bottom-0 right-0'>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className='w-full h-full flex flex-row justify-center'>
                    <div className='flex flex-col justify-center font-bold'>
                      No hotels found!
                    </div>
                  </div>
                )}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Results;
