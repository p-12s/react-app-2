import {useState} from 'react';

// callback - запрос, во время ожидания которого показыватеся прелоадер 
export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true)
      await callback()

    } catch (e) {
      setError(e.message)
       
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}
