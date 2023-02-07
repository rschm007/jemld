import { ContactForm, LayoutPrimary } from "@/components";
import BannerHeader from "@/components/Layout/BannerHeader";

export const ContactPage = () => {

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="space-y-2 mt-48">

                        <div className="my-24 w-full h-full flex flex-row items-center justify-center">
                            <ContactForm className="w-1/2" />
                        </div>

                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export default ContactPage;