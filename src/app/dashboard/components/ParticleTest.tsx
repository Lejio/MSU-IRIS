'use client';

import React from 'react'
import axios from 'axios'

export default function ParticleTest() {

    const sendParticleRequest = async () => {
        const response = await axios.get('https://api.particle.io/v1/build', {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PARTICLE_CLIENT_SECRET}`,
            }
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    <div>
      <button onClick={sendParticleRequest}>
        Send Particle.io request
      </button>
    </div>
  )
}
