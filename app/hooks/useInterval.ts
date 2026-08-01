import { useEffect, useRef } from 'react';

/**
 * Un custom hook que configura un intervalo y lo limpia al desmontar el componente.
 * 
 * @param callback - La función a ejecutar en cada intervalo.
 * @param delay - El tiempo en milisegundos entre cada ejecución. Pasa `null` para pausar el intervalo.
 */
function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Recuerda el último callback si cambia.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Configura el intervalo.
    useEffect(() => {
        // No programar si no se especifica un retraso (delay).
        if (delay === null) {
            return;
        }

        const id = setInterval(() => {
            savedCallback.current();
        }, delay);

        return () => clearInterval(id);
    }, [delay]);
}

export default useInterval;