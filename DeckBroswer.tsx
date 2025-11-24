import Image from "next/image"; 

 

export default function DeckBrowser() { 

    return ( 

        <div className="mx-auto max-w-7xl px-4 py-8"> 
            <div className="flex flex-col gap-8 md:flex-row"> 
                {/* <p>Komponenta DeckBrowser je ovde</p> */} 

                {/* Cards */} 
                <section className="flex-1"> 
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
                        <div 
                            key={1} 
                            className="group relative overflow-hidden rounded-lg border border-gray-200" > 
                            <Image 
                                src="https://picsum.photos/300/400" 
                                alt="" 
                                width={400} 
                                height={300} 
                                className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-105" /> 

                            <div className="p-4"> 
                                <h3 className="font-semibold">Naziv spila</h3> 
                                <p className="text-sm text-gray-500"> 
                                    Naziv predmeta 
                                </p> 
                            </div> 
                        </div> 
                    </div> 
                </section> 
            </div> 
        </div> 
    ); 
} 