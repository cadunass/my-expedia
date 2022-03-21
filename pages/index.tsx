import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import dayjs from 'dayjs';
import Layout from '../components/Layout';
import Datepicker from '../components/Datepicker';
import { Hotel } from '../interfaces';

const Home: NextPage = () => {
  const [suggestedHotels, setSuggestedHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const getHotels = async () => {
      const response = await fetch('/api/hotels');
      const data = await response.json();
      const randomHotels = data.sort(() => 0.5 - Math.random());
      const hotels = randomHotels
        .filter((hotel: Hotel) => hotel.booked?.length)
        ?.slice(0, 3);

      setSuggestedHotels(hotels);
    };

    getHotels();
  }, []);

  if (!suggestedHotels.length)
    return (
      <Layout>
        <div className='flex justify-center'>loading...</div>
      </Layout>
    );

  return (
    <Layout>
      <main className='p-0 m-0 box-border'>
        <form
          className='p-8'
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();

            const target = e.target as typeof e.target & {
              place: { value: string };
              checkin: { value: string };
              checkout: { value: string };
            };
            const place = target.place.value;
            const checkin = target.checkin.value;
            const checkout = target.checkout.value;

            Router.push({
              pathname: '/results',
              query: { place, checkin, checkout },
            });
          }}
        >
          <div className='p-8 border border-solid border-gray-300 rounded-lg'>
            <div className='mb-4 flex justify-center'>
              <input
                className='w-full border border-solid rounded-lg border-gray-400 p-4 mr-2'
                name='place'
                id='place'
                type='text'
                placeholder='Going to'
              />
              <Datepicker name='checkin' value={dayjs().format('YYYY-MM-DD')} />
              <Datepicker
                name='checkout'
                value={dayjs().add(1, 'd').format('YYYY-MM-DD')}
              />
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                className='bg-blue-600 rounded-lg p-4 text-white'
                type='submit'
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div className='flex flex-row justify-center w-full h-full p-8'>
          {suggestedHotels.map((item) => (
            <div
              className='flex flex-col bg-white rounded-lg mb-3 hover:cursor-pointer px-2'
              onClick={() => alert('TODO')}
              key={item.id}
            >
              <Image
                src={item.image as string}
                alt={item.alt as string}
                width={384}
                height={256}
              />
              <div className='my-2 w-full'>
                <div className='flex flex-col'>
                  <h3 className='font-light'>{item.name}</h3>
                  <span className='text-sm font-light'>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
