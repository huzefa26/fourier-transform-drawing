function DiscreteFourierTransform(signal){
    let transform = [], re=0, im=0, phi=0;
    const N = signal.length;
    for (let k=0; k < N; k++){
        re = 0, im = 0;
        for (let i=0; i<N; i++){
            phi = (TWO_PI * k * i) / N;
            re += signal[i] * cos(phi);
            im -= signal[i] * sin(phi);
        }
        re /= N;
        im /= N;

        let freq = k;
        let phase = atan2(im, re);
        let amp = sqrt(re*re + im*im);

        transform.push({re, im, freq, amp, phase});
    }
    return transform;
}