import {getProviders, signIn } from "next-auth/react";
function Login( {providers} ) {
    return ( 
      <div className="flex flex-col items-center bg-black w-full min-h-screen justify-center">
        <div className="">
         this is a login
        </div>

        {Object.values(providers).map((provider) => (
         <div key={provider.name} >
            <button className=" rounded-full bg-white"  onClick={() => signIn(provider.id, {callbackUrl: "/" })}>Login with {provider.name}</button> 
        </div>
        ))}
      </div>
     );
   
}

export default Login;

export async function getServerSideProps(){
   const providers = await getProviders();

   return {
      props: {
         providers,
      },
   };
}