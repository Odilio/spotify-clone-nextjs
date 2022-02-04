import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token){
    try{
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);
       
      const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
      console.log("Refreshd token 15", refreshedToken)

      return {
        ...token,
        accessToken: refreshedToken.access_token,
        accessTokenExpires: Date.now +  refreshedToken.access_token.expires_in * 1000,

        refreshedToken: refreshedToken.refreshToken ?? token.refreshToken,
      }
    }catch (error){
        console.error(error)

        return{
            ...token,
            error: 'Refrash access token error'
        }
    }

}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
      signIn: '/login'
  },
  callbacks: {
      async jwt({ token, account, user}){

        if (account && user){
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at  * 1000,

            }
        }

        if (Date.now() < token.accessTokenExpires){
            return token;
        }


        console.log('Access token has expired')

        return await refreshAccessToken(token);
      },

      async session({ session, token}){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
      }
  }
})