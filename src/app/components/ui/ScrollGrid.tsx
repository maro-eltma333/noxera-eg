"use client";

import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import "./ScrollGrid.css";

export function ScrollGrid() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const layersRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            console.log("Reduced motion preference detected - skipping animations");
            return;
        }

        if (!imageRef.current || !sectionRef.current || layersRef.current.length === 0) {
            return;
        }

        const image = imageRef.current;
        const firstSection = sectionRef.current;

        // Measure the natural size before animating
        const naturalWidth = image.offsetWidth;
        const naturalHeight = image.offsetHeight;

        // Get viewport dimensions in pixels
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // 1. Center Image - Epic 3D Deep Zoom
        scroll(
            animate(
                image,
                {
                    width: [`${viewportWidth}px`, `${naturalWidth}px`],
                    height: [`${viewportHeight}px`, `${naturalHeight}px`],
                    borderRadius: ["0rem", "1.5rem"],
                    rotateX: ["0deg", "0deg"],
                    rotateZ: ["0deg", "0deg"],
                    y: ["0px", "0px"],
                    boxShadow: ["0 0px 0px rgba(0,0,0,0.9)", "0 30px 60px rgba(0,0,0,0.7)"]
                },
                {
                    ease: [0.76, 0, 0.24, 1], // Cinematic curve
                }
            ),
            {
                target: firstSection,
                offset: ["start start", "85% end"] as any,
            }
        );

        // 2. Parallax, Tilt, Blur, and Scatter for grid layers
        const layerEasings = [
            [0.25, 1, 0.5, 1], // Outer - springy
            [0.76, 0, 0.24, 1], // Middle - sharp cinematic
            [0.87, 0, 0.13, 1], // Inner - deep power curve
        ] as any;

        const layerYStart = ["40vh", "60vh", "30vh"];
        const layerYEnd = ["-150px", "-50px", "20px"];
        const layerScaleStart = [0.1, 0.2, 0.3];
        const layerRotates = ["15deg", "-12deg", "8deg"];

        layersRef.current.forEach((layer, index) => {
            if (!layer) return;

            const endOffset = `${1 - index * 0.15} end` as any; // stagger landing times deeply

            // Fade, scale, parallax, rotate, and un-blur
            scroll(
                animate(
                    layer,
                    {
                        opacity: [0, 0.5, 1],
                        scale: [layerScaleStart[index], layerScaleStart[index] * 2, 1],
                        y: [layerYStart[index], layerYStart[index], layerYEnd[index]],
                        rotateZ: [layerRotates[index], "5deg", "0deg"],
                        filter: ["blur(20px)", "blur(10px)", "blur(0px)"]
                    },
                    { ease: layerEasings[index] }
                ),
                {
                    target: firstSection,
                    offset: ["start start", "25% start", endOffset],
                }
            );
        });

    }, []);

    return (
        <div className="scroll-grid-wrap" ref={wrapRef}>
            <header>
                <h1 className="fluid font-oswald uppercase font-black text-white leading-none tracking-tighter">
                    NOXERA<span className="text-accent">.</span><br />
                    CRAFT
                </h1>
                <h2 className="fluid text-white/50 tracking-widest font-bold uppercase mt-8 text-sm md:text-xl relative z-10 w-full max-w-lg">
                    Premium heavyweight box fit drops. Engineered for superior presence, fit, and comfort.
                </h2>
            </header>
            <main>
                <section ref={sectionRef}>
                    <div className="content">
                        <div className="grid">
                            {/* Layer 1: Outer edges (6 images) */}
                            <div
                                className="layer"
                                ref={(el) => {
                                    if (el) layersRef.current[0] = el;
                                }}
                            >
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670361590_17856255294690314_7289482166490305316_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE-QdfNnWIxxVe922p90fxJdq9qUA3rgsl2r2pQDeuCyfF0y4iY58NFmNG-9bfFlQV46MZH2HdIvEYd8YVNPvmE&_nc_ohc=_XQMEG8Zb2gQ7kNvwFIg8wO&_nc_oc=AdqKJfEpDNaBJ02SuzXut1JWFAGqXE4M1Ppsz0kNzLvkert3CsBzLA1F_scO7qHiLeo&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=xLxYGMYbbbSz7a_B2265aA&_nc_ss=7e2a8&oh=00_Af7H1aCqCksNMsDczBusl7Gsc4-WHl-OBLTK6PcnfO1RFQ&oe=6A12EF85" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670732566_17856255291690314_5855052108803444618_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHI4qyMAMieLGY6nZMfZGWr-2aZSlHFUWX7ZplKUcVRZUTnZ9A1le9cBCU5-utdyny10hsHNX351Lea0P3hy84e&_nc_ohc=Sja7Bd8yI3gQ7kNvwH8facO&_nc_oc=Adr-_WOycJ4oU5f_F0hzgct9pSTE1ZRJCaUYAB4OXmYno3Fb5FRm6m5m7ikBmBGS0gY&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=yPgirTD9UabIRdnKdvgbTg&_nc_ss=7e2a8&oh=00_Af7oilkCIaAi9Mb5BtwrMUGWmHVfTSaLxizMNcb9mDxY_g&oe=6A12D400" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670174823_17856255303690314_245926506988640779_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHOL4yXbVjlV3U3ElCbpVwF0qzYSAfPzFHSrNhIB8_MUd5wWkCRqb1NFqisOOk7k0Za67mqP37LzAUXFmyi3pWK&_nc_ohc=j5sb52srhXEQ7kNvwG-QJdd&_nc_oc=AdoLxtzm62so4SZ7bAcmo-ryHHfHq_QlXe0TMPeAG5PybQguzFgf51Ifah6qoTwTox0&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=0Ddq3vambUpNEXOVJSvgAQ&_nc_ss=7e2a8&oh=00_Af5agJQh3EW-_AkL6D8Hycm8atN8JI9vScBI9kFYp9UBdA&oe=6A12CD37" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/684903206_17858946234690314_1727982633002148345_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG75BSREt-EVOKZl6svTTwHboNKkqMouiRug0qSoyi6JNzQsBJuFxUDlAuSm2RwLEb4-J0Eb9UzPpodJVVVBdeG&_nc_ohc=ckWeuZr3yT4Q7kNvwHFinEQ&_nc_oc=AdoVPVPXXLz9q99JEvM8m3571urQx4braV4mn1MXx_tOV1iPHEw3tdqeuzBMd5Rz-YQ&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=3IOiekLZR7sSxGAT47zyIw&_nc_ss=7e2a8&oh=00_Af7YNgy5270SjhJJh81rz_jpUPtuMuuaxfESPICe0-wmXA&oe=6A12F158" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/681912880_17858946255690314_3037154434913048462_n.jpg?stp=dst-jpegr_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEejST_NSyLsSyahuQxuvD1pzQDtQSlh46nNAO1BKWHjtmf-0EKLSN5g7Y0pqC-T0jF5CqOH5r3gixPz7DeKOaw&_nc_ohc=4s2MRCjbIEkQ7kNvwGYeuqv&_nc_oc=AdqdTpLqjT7wn5fmXybkQsvQsAV-SkP6JYJPD6hRSsfziDbONrXQy2pUTY8cAIWQhmc&_nc_zt=23&se=-1&_nc_ht=scontent.fcai1-2.fna&_nc_gid=Vt9RglOl0Z1FIwfK_R4jDA&_nc_ss=7e2a8&oh=00_Af7QlXF6XmHV55lHZWbfwvBE08xtpnUUwQiG3rzRWC-ZNQ&oe=6A12EC9C" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t39.30808-6/678522025_122106966812814580_1613362949076485720_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF_ELeX-xwpSQgHxj_9NdFY6KQqUghFgq7opCpSCEWCrltD9QG9C0U478s2y-BeVozyaeELbWgluMaIkXpNAFGN&_nc_ohc=rU0ICHGDuRIQ7kNvwF3w1P8&_nc_oc=Adrt9-u0R70Zyx_fFiKq38urxSb41Xz_vWj5elTCw1-pAUTk2ML1mCnzh7kA2w-3ja0&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=U3nYtDLwNWdKv3qRNJhKxg&_nc_ss=7e2a8&oh=00_Af7EnUEZMdjR69JFbiM4eYtveP5FRddGi2pvmNRGAIgHLA&oe=6A12EDA7" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                            </div>

                            {/* Layer 2: Inner columns (6 images) */}
                            <div
                                className="layer"
                                ref={(el) => {
                                    if (el) layersRef.current[1] = el;
                                }}
                            >
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670227164_17856256530690314_7644690225168103901_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGZ_mrwSm7woXLt9RpRQtre8YYBBTShotrxhgEFNKGi2i3IeSQuQD6qP-C5xkrOYf5t9KzsFZOnwBYe7AE8pwrJ&_nc_ohc=-6msA7waVesQ7kNvwEgrFW_&_nc_oc=AdooOFUQdV8Ljqiy6pBkf2i0pGvJiP0EG8JUY01TX4XMYqIB-AoZjHkoIfhDLJI_fBw&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=n0hoo-OS8wLGw5cWLykONQ&_nc_ss=7e2a8&oh=00_Af7o2aYoVYVA12ZqZqp6mOo6NIuodz0m6ZQzNIQBHGlQuQ&oe=6A12F8DC" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670436496_17856256557690314_8771406742981588319_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF9c1VksefbbJK5iuq1tafoJXOLsP6Op3Alc4uw_o6ncEsjHe87II2K-s6o1-p1Yjz_PScCbRfQ9IG7z2NHYahi&_nc_ohc=rJtjAoa1PpQQ7kNvwFkY_OC&_nc_oc=AdohCa28eAlnCIiHtn5jcCxIlU9mPiom9Z17xFtnFXPewVlFvOIyozS0kDzfWAxH2zg&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=9pxSohCstkllFXn8mqOAvA&_nc_ss=7e2a8&oh=00_Af6j3lazBoM9bREf9-a1x0TTxzIeMQB6j9kN3DYNMQaMTA&oe=6A12FB57" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670928019_17856257607690314_7084855395818442166_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFj2HAdjoXaBhmoMkzAXt1LEmR5w-grX3kSZHnD6CtfeUSQh_apu16f_NrzGSiF5ONwTxVljEgERLGyW11-GrsL&_nc_ohc=vkNbdcWVxiYQ7kNvwFAgDBZ&_nc_oc=AdovcMAHgeYIVmQWEVPj2HBso6TpFJ4jSnoqwGwJgMw9dxWesU3uZ0xux0Ry_0rXHAM&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=jk4D-C-37IXku1YfwCY77Q&_nc_ss=7e2a8&oh=00_Af5Ww4hcgl_hJW-XFaCk19rjiBuKvFXaxaFIUI9NGvMkTg&oe=6A12FE16" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/669922205_17856257652690314_4101221659718038456_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF3jD24XqJ-ITyYaoys3kJB-tXTJ1EX0_b61dMnURfT9pAhQWFiUo5zDZaKYAbiGG0qksh59m919NMLHc8poyoQ&_nc_ohc=np62pdLIjrAQ7kNvwEyoenR&_nc_oc=AdqGl8p3E2ENJwRTipG1ey-iiU2JPHj_RjPDhefCQ_l5TCOU3gpzOPDAcl46ETaKLGs&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=6n5G4ZnnRWxbCiDMFC5MZQ&_nc_ss=7e2a8&oh=00_Af4bo9JipHgKUWirDaT5ZPtV3_XJEzrn09TOQ43E5_5ReA&oe=6A12D842" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670594641_17856257622690314_2685947650897200099_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHzrAek8-dIj8Wi2Cq30w65TC_ytvK6qgVML_K28rqqBeCQpdTwDTBnha6IrTTKKrELnzSr4QzGIBHHBXAyqICA&_nc_ohc=6sdeWwDxungQ7kNvwFW07bC&_nc_oc=AdoYsn1hECBEmodIhDEqb-tAWiaoQSVlVY7i43WqPtX3Jrvw7eJg8FO0mrbT84SpYJo&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=yAbofmTyr9BKCD4Kd0NmqQ&_nc_ss=7e2a8&oh=00_Af5PSCj1IgbCWGKi4vezcFOMk96T6h_WSVJsDr0-UKKB2w&oe=6A12D925" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670361590_17856255294690314_7289482166490305316_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE-QdfNnWIxxVe922p90fxJdq9qUA3rgsl2r2pQDeuCyfF0y4iY58NFmNG-9bfFlQV46MZH2HdIvEYd8YVNPvmE&_nc_ohc=_XQMEG8Zb2gQ7kNvwFIg8wO&_nc_oc=AdqKJfEpDNaBJ02SuzXut1JWFAGqXE4M1Ppsz0kNzLvkert3CsBzLA1F_scO7qHiLeo&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=xLxYGMYbbbSz7a_B2265aA&_nc_ss=7e2a8&oh=00_Af7H1aCqCksNMsDczBusl7Gsc4-WHl-OBLTK6PcnfO1RFQ&oe=6A12EF85" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                            </div>

                            {/* Layer 3: Center column top and bottom (2 images) */}
                            <div
                                className="layer"
                                ref={(el) => {
                                    if (el) layersRef.current[2] = el;
                                }}
                            >
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t39.30808-6/678522025_122106966812814580_1613362949076485720_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF_ELeX-xwpSQgHxj_9NdFY6KQqUghFgq7opCpSCEWCrltD9QG9C0U478s2y-BeVozyaeELbWgluMaIkXpNAFGN&_nc_ohc=rU0ICHGDuRIQ7kNvwF3w1P8&_nc_oc=Adrt9-u0R70Zyx_fFiKq38urxSb41Xz_vWj5elTCw1-pAUTk2ML1mCnzh7kA2w-3ja0&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=U3nYtDLwNWdKv3qRNJhKxg&_nc_ss=7e2a8&oh=00_Af7EnUEZMdjR69JFbiM4eYtveP5FRddGi2pvmNRGAIgHLA&oe=6A12EDA7" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                                <div>
                                    <img src="https://scontent.fcai1-2.fna.fbcdn.net/v/t51.82787-15/670436496_17856256557690314_8771406742981588319_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF9c1VksefbbJK5iuq1tafoJXOLsP6Op3Alc4uw_o6ncEsjHe87II2K-s6o1-p1Yjz_PScCbRfQ9IG7z2NHYahi&_nc_ohc=rJtjAoa1PpQQ7kNvwFkY_OC&_nc_oc=AdohCa28eAlnCIiHtn5jcCxIlU9mPiom9Z17xFtnFXPewVlFvOIyozS0kDzfWAxH2zg&_nc_zt=23&_nc_ht=scontent.fcai1-2.fna&_nc_gid=9pxSohCstkllFXn8mqOAvA&_nc_ss=7e2a8&oh=00_Af6j3lazBoM9bREf9-a1x0TTxzIeMQB6j9kN3DYNMQaMTA&oe=6A12FB57" referrerPolicy="no-referrer" alt="Collection piece" />
                                </div>
                            </div>

                            {/* Center scaler image */}
                            <div className="scaler">
                                <img
                                    ref={imageRef}
                                    src="/images/boxfit_hero.png"
                                    referrerPolicy="no-referrer"
                                    alt="Hero look"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Padding section to create space before next page contents */}
                <section></section>
            </main>
        </div>
    );
}
