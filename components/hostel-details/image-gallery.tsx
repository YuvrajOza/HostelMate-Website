'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ImageGallery({
    images,
    alt,
}: {
    images: string[];
    alt: string;
}) {
    const [index, setIndex] = useState(0);
    const [lightbox, setLightbox] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-500">
                <div className="flex flex-col items-center gap-2">
                    <ImageOff className="h-8 w-8" />
                    <span className="text-sm font-medium">Hostel images not available</span>
                </div>
            </div>
        );
    }

    const go = (dir: -1 | 1) =>
        setIndex((i) => (i + dir + images.length) % images.length);

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-[16/9] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={images[index]}
                        alt={`${alt} — image ${index + 1}`}
                        className="h-full w-full cursor-zoom-in object-cover"
                        onClick={() => setLightbox(true)}
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Previous image"
                                onClick={() => go(-1)}
                                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white dark:bg-slate-800/90 dark:text-white dark:hover:bg-slate-800"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next image"
                                onClick={() => go(1)}
                                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white dark:bg-slate-800/90 dark:text-white dark:hover:bg-slate-800"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </>
                    )}

                    <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-medium text-white">
                        {index + 1} / {images.length}
                    </span>
                </div>
            </div>

            {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                        <button
                            key={img + i}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Show image ${i + 1}`}
                            className={cn(
                                'h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition',
                                i === index
                                    ? 'border-brand-600'
                                    : 'border-transparent opacity-70 hover:opacity-100',
                            )}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {lightbox && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
                    onClick={() => setLightbox(false)}
                >
                    <button
                        type="button"
                        aria-label="Close"
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={images[index]}
                        alt={alt}
                        className="max-h-full max-w-full rounded-xl object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}