"use client"; // Nécessaire : écoute d'événements navigateur + localStorage
 
import { useEffect, useState } from "react";
import { useInstalledDate } from "@/providers/InstalledDateProvider";
 
// Type de l'événement beforeinstallprompt (non standard dans les libs DOM)
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>; // Affiche la boîte d'installation native
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>; // Choix de l'utilisateur
}
 
export default function InstallPrompt() {
    // L'événement capturé pour déclencher l'installation plus tard
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    // Date de dernière fermeture de la bannière (epoch en secondes)
    const [installDate, setInstallDate] = useInstalledDate();
    // Horodatage courant au montage (évite de recalculer Date.now() à chaque rendu)
    const [currentDate, setCurrentDate] = useState(() =>
        Math.floor(Date.now() / 1000)
    );
 
    useEffect(() => {
        // Intercepte l'événement PWA avant que le navigateur n'affiche son propre prompt
        const getInstallPrompt = (event: Event) => {
            event.preventDefault(); // Empêche le mini-infobar par défaut (Chrome)
            setInstallPrompt(event as BeforeInstallPromptEvent);
        };
 
        window.addEventListener("beforeinstallprompt", getInstallPrompt);
 
        // Nettoyage : retire l'écouteur au démontage
        return () => {
            window.removeEventListener("beforeinstallprompt", getInstallPrompt);
        };
    }, []);
 
    // Fermeture manuelle : masque la bannière et mémorise la date (délai 24 h)
    const handleClose = () => {
        setInstallPrompt(null);
        setInstallDate(currentDate);
    };
 
    // Lance le dialogue d'installation du navigateur
    const handleInstall = async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
 
        // Si accepté, on retire la bannière immédiatement
        if (outcome === "accepted") {
            setInstallPrompt(null);
        }
    };
 
    const installationDisponible = Boolean(installPrompt);

    return (
        <button
            type="button"
            onClick={handleInstall}
            disabled={!installationDisponible}
            className={`text-sm font-semibold transition ${
                installationDisponible
                    ? "text-[#8C1D1D] underline decoration-[#8C1D1D] underline-offset-2 hover:text-[#701616]"
                    : "text-[#9CA3AF] cursor-not-allowed"
            }`}
            title={
                installationDisponible
                    ? "Cliquer pour installer l'application"
                    : "Installation disponible sur les navigateurs compatibles"
            }
        >
            Cliquer pour installer l'application
        </button>
    );
}