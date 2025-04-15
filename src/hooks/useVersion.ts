import { useEffect, useState } from 'react';

export function useVersion() {
    const [version, setVersion] = useState<string | null>(null);

    useEffect(() => {
        fetch('/note/version.txt')
            .then(res => res.text())
            .then(setVersion)
            .catch(() => setVersion(null));
    }, []);

    return version;
}
