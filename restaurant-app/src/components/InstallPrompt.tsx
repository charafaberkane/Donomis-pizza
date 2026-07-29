"use client"; // Nécessaire : écoute d'événements navigateur + localStorage
 
import { useEffect, useState } from "react";
 
// Type de l'événement beforeinstallprompt (non standard dans les libs DOM)
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>; // Affiche la boîte d'installation native
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>; // Choix de l'utilisateur
}
 
export default function InstallPrompt() {
    // L'événement capturé pour déclencher l'installation plus tard
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    // Note: Installation banner state only
 
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
 
    // Fermeture manuelle : masque la bannière (fonctionality kept if needed later)
    // const handleClose = () => setInstallPrompt(null);
 
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
            className={`text-sm font-semibold transition`}
            style={
                installationDisponible
                    ? { color: "var(--color-bordeaux)", textDecoration: "underline", textDecorationColor: "var(--color-bordeaux)" }
                    : { color: "#9CA3AF", cursor: "not-allowed" }
            }
            title={
                    installationDisponible
                        ? "Cliquer pour installer l&apos;application"
                        : "Installation disponible sur les navigateurs compatibles"
                }
        >
                Cliquer pour installer l&apos;application
        </button>
    );
}