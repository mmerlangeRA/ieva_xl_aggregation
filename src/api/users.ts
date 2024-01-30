import service from '@/utils/request'


export interface IUserData {
    email: string,
    name: string,
    id: string
}
export interface ILoginData {
    access_token: string,
    user: IUserData,
}


export interface Token {
    accessToken: string
    refreshToken: string

    // tokenType: string
    // expiresAt: number
    // issuedAt: number
    // refreshTokenExpiresAt: number
    // refreshTokenIssuedAt: number
}

export const getUsers = () => service.get<IUserData[]>('/users')

export const getUser = (userId: string) =>
    service.get<IUserData>(`/users/${userId}`)


export const createUserNoCredentials = (email: string,password:string) =>
    service.post<IUserData>('auth/signup/', { email, password }, {
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
        }
    })

    
export const checkToken = (token:string) =>
    service.get<Boolean>('auth/token/' + token)

export const login = (username: string, password: string) => {
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    return service.post<ILoginData>('auth/login', form)
}
   

export const logout = (sessionId: string) =>
    service.post<boolean>('/auth/logout/?session_id=' + sessionId)


export const refreshToken = (refreshToken: string) =>
    service.post<Token>('/auth/refresh-token', { refreshToken })

export const resetPassword = (newPassword: string, oldPassword: string) =>
    service.post('/users/reset-password', {
        newPassword,
        oldPassword,
    })

/*


fetch("http://192.168.1.27:5000/v1/users/", {
    "headers": {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
        "content-type": "application/json"
    },
    "referrer": "http://192.168.1.27:5000/docs",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\n  \"user_id\": \"string\",\n  \"name\": \"string\"\n}",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
});

*/