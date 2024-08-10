import React from 'react';

const UserProfile = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Banner */}
      <div className="bg-gray-200 h-48 relative">
        
        <div className="absolute left-4 bottom-0 transform translate-y-1/2">
          <img
            src="/avatar.png"
            alt="Perfil"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Profile info */}
      <div className="mt-16 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">San</h1>
            <p className="text-gray-600">@usuario1</p>
            <p className="mt-2">Descripción</p>
            <p className="text-gray-600 text-sm">Se unió en junio de 2024</p>
          </div>
          <button className="border rounded-full px-4 py-2 font-semibold text-blue-500 border-blue-500">
            Editar perfil
          </button>
        </div>

        {/* followers/follows */}
        <div className="mt-4 flex space-x-8">
          <div>
            <span className="font-bold">138</span> Siguiendo
          </div>
          <div>
            <span className="font-bold">47</span> Seguidores
          </div>
        </div>
      </div>

      {/* Profile navigation */}
      <div className="mt-8 border-b">
        <ul className="flex justify-around">
          <li className="cursor-pointer py-4 text-blue-500 border-b-4 border-blue-500">
            Posts
          </li>
          <li className="cursor-pointer py-4 text-gray-600">
            Respuestas
          </li>
          <li className="cursor-pointer py-4 text-gray-600">
            Me gusta
          </li>
        </ul>
      </div>

      {/* Posts */}
      <div className="mt-4">
        {/* Post user */}
        <div className="border-b py-4">
          <p className="text-gray-600 text-sm">Fijado</p>
          <p className="mt-2">Hola</p>
          <div className="flex space-x-8 mt-2">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-1">2</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m-4 4h10" />
              </svg>
              <span className="ml-1">2</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-1">790</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
